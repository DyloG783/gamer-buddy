import React, { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import { useFormStatus } from "react-dom";

interface IEditCancelSubmitButtonProps {
    setEditing: Dispatch<SetStateAction<boolean>>;
    editing: boolean;
    label: string;
    inputValid?: boolean;
    submitFormName: string;
}

const EditCancelSubmitButton: React.FC<IEditCancelSubmitButtonProps> = ({ setEditing, editing, label, inputValid, submitFormName }) => {

    interface IValidationRequiredImageProps {
        inputValid: boolean | undefined
    }

    const ValidationRequiredImage: React.FC<IValidationRequiredImageProps> = ({ inputValid }) => {
        if (inputValid === undefined) {
            return (
                <Image src="./checkmark-icon.svg"
                    onClick={() => setEditing(false)}
                    height={0} width={0} alt="Submit button"
                    className={`w-4 md:w-7`}
                />
            )
        }
        else {
            return (
                <Image src="./checkmark-icon.svg"
                    onClick={() => setEditing(false)}
                    height={0} width={0} alt="Submit button"
                    className={`w-4 md:w-7 ${inputValid ? '' : 'hidden'}`}
                />
            )
        }
    }

    // pending state to disable submit button whileserver action completes
    const { pending } = useFormStatus()

    return (
        <div className="flex justify-between">
            <span className="font-bold">{label}</span>
            <Image src="./edit_icon.svg"
                onClick={() => setEditing(true)} height={0} width={0} alt="Edit button"
                className={`w-4 md:w-7 ${editing ? 'hidden' : ''}`}
            />
            <div className={`flex gap-2 ${editing ? '' : 'hidden'}`}>
                <button
                    type="submit"
                    form={submitFormName}
                    className={`${editing ? '' : 'hidden'}`}
                    aria-disabled={pending}
                >
                    <ValidationRequiredImage inputValid={inputValid} />
                </button>
                <Image src="./red_cross.svg"
                    onClick={() => setEditing(false)}
                    height={0} width={0} alt="Cancel edit button"
                    className={`w-4 md:w-7 ${editing ? '' : 'hidden'}`}
                />
            </div>
        </div>
    )
}

export default EditCancelSubmitButton