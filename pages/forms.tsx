import {useForm} from "react-hook-form";

export default function Forms() {
    const { register, handleSubmit } = useForm();
    const onValid = () => {
        console.log("valid")
    }
    const onInValid = () => {
        console.log("InValid")
    }

    return (
        <>
            <form onSubmit={handleSubmit(onValid, onInValid)}>
                <input {...register(
                    "username",
                    {
                        required: "이름을 적어주세요",
                        minLength: {
                            value: 1,
                            message: "이름은 최소 1글자 이상 적어야합니다."
                        }
                    })}
                       type="text"
                       placeholder="Username"
                />
                <input {...register(
                    "email",
                    {
                        required: "이메일을 적어주세요",
                        minLength: {
                            value: 1,
                            message: "이메일은 최소 1글자 이상 적어야합니다."
                        }
                    })}
                       type="email"
                       placeholder="Email"
                />
                <input {...register(
                    "password",
                    {
                        required: "비밀번호를 적어주세요",
                        minLength: {
                            value: 8,
                            message: "비밀번호는 최소 8글자 이상 적어야합니다."
                        }
                    })}
                       type="password"
                       placeholder="Password"
                />
                <input type="submit" value="계정 생성"/>
            </form>
        </>
    );
}