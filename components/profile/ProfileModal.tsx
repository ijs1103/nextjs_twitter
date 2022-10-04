import { useState, useEffect, useRef, ChangeEvent } from "react";
import Button from "@components/Button";
import useMutation from "@libs/useMutation";
import AvatarEditor from "react-avatar-editor";
import { useForm } from "react-hook-form";
import Input from "@components/Input";
import Avatar from "@components/Avatar";
import axios from "axios";
import { BUCKET_URL } from "@libs/constants";
import { editedAvatarState } from "@components/states";
import { useSetRecoilState } from "recoil";

interface EditForm {
  nickName: string;
  avatar: FileList | null;
}
interface Props {
  onClose: () => void;
  nickName: string;
  avatarUrl: string | null;
}
function ProfileModal({ onClose, nickName, avatarUrl }: Props) {
  const setEditedAvatar = useSetRecoilState(editedAvatarState)
  const avatarEditorRef = useRef<any>(null);
  const [previewUrl, setPreviewUrl] = useState('')
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState('')
  const [croppedFile, setCroppedFile] = useState<File | null>(null)
  const [scale, setScale] = useState(1)
  const [mode, setMode] = useState<'default' | 'cropMode'>('default')
  const [editProfile] = useMutation('/api/profile/edit')
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<EditForm>({ mode: "onChange", defaultValues: { nickName, avatar: null } });
  const avatar = watch('avatar');
  useEffect(() => {
    if (!avatar) return;
    let blobUrl = ''
    const file = avatar[0]
    blobUrl = URL.createObjectURL(file)
    setPreviewUrl(blobUrl)
    setMode('cropMode')
    return () => {
      URL.revokeObjectURL(blobUrl)
    }
  }, [avatar])
  const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(e.target.value)
    setScale(scale)
  }
  const onValid = async (form: EditForm) => {
    // 프로필과 닉네임 모두 변경하지 않았을시 early return 
    if (!croppedFile && nickName === form.nickName) return
    let newAvatar = ''
    if (croppedFile) {
      const { data: { url, objectName } } = await axios.post('/api/profile/uploadAvatar', { name: croppedFile.name, type: croppedFile.type })
      await axios.put(url, croppedFile, {
        headers: {
          'Content-type': croppedFile.type,
          'Access-Control-Allow-Origin': '*',
        },
      })
      newAvatar = BUCKET_URL + objectName
    }
    // 프로필 혹은 닉네임이 변경 되었을 경우에만 request의 body에 데이터를 전송
    editProfile({ ...(newAvatar && { avatar: newAvatar }), ...(nickName !== form.nickName && { nickName: form.nickName }) })
    setEditedAvatar(croppedPreviewUrl)
    onClose()
  }
  const handleEditImage = () => {
    if (!avatarEditorRef) return;
    avatarEditorRef.current.getImageScaledToCanvas().toBlob((blob: any) => {
      const newFile = new File([blob], `${nickName}_avatar`, { type: blob.type })
      setCroppedFile(newFile)
      const blobUrl = URL.createObjectURL(blob);
      setCroppedPreviewUrl(blobUrl);
    });
    setMode('default')
  }
  return (
    <>
      <div onClick={onClose} className="fixed top-0 left-0 z-10 w-full h-full bg-black opacity-60">
      </div>
      <div className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg h-full w-full sm:h-[500px] sm:w-[500px] bg-slate-800 flex flex-col">
        <div className="flex items-center justify-between m-2">
          {mode === 'default' ?
            <>
              <div className="flex gap-4">
                <svg onClick={onClose} className="w-6 h-6 transition-colors rounded-full cursor-pointer hover:bg-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                <span className="font-bold select-none">Edit profile</span>
              </div>
              <button disabled={!isValid} className="px-4 py-1 text-sm font-bold text-black transition-colors bg-white hover:bg-slate-300 sm:px-6 rounded-xl sm:rounded-full" type="submit" form="modalForm">Save</button>
            </>
            :
            <>
              <div className="flex gap-4">
                <svg onClick={() => setMode('default')} className="w-6 h-6 transition-colors rounded-full cursor-pointer hover:bg-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                <span className="font-bold select-none">Edit Image</span>
              </div>
              <Button onClick={handleEditImage}>Apply</Button>
            </>
          }
        </div>
        {mode === 'default' ? <form id='modalForm' onSubmit={handleSubmit(onValid)} className="flex flex-col justify-center h-full m-10 space-y-8 sm:m-5">
          <label className='block mx-auto cursor-pointer'>
            <Avatar url={croppedPreviewUrl ? croppedPreviewUrl : avatarUrl} isBig />
            <input
              {...register('avatar')}
              type='file'
              accept='image/*'
              className='hidden'
            />
          </label>
          <div className="mb-6">
            <Input
              id="nickName"
              isFilled={!!getValues("nickName")}
              label="닉네임"
              register={register("nickName", { required: true })}
              hasError={!!errors?.nickName}
            />
            {errors?.nickName && (
              <span className="ml-3 text-xs text-red-600">
                닉네임을 입력하세요
              </span>
            )}
          </div>
        </form>
          :
          <>
            <div className="flex items-center justify-center">
              <AvatarEditor
                ref={avatarEditorRef}
                image={previewUrl}
                width={300}
                height={300}
                color={[0, 0, 0, 0.5]}
                borderRadius={150}
                border={50}
                scale={scale}
              />
            </div>
            <div className="flex items-center justify-center h-full">
              <input
                className="mx-4 w-full sm:w-[400px]"
                name="scale"
                type="range"
                onChange={handleScale}
                min={'0.1'}
                max="2"
                step="0.01"
                defaultValue="1"
              />
            </div>
          </>
        }
      </div>
    </>
  );
}

export default ProfileModal;
