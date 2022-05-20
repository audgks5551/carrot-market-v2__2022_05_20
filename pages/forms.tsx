import {useForm} from "react-hook-form";

export default function Forms() {
    const { register, watch } = useForm();
    console.log(register("hi"));
    console.log(watch());
    return (
        <>
            <form>
                <input {...register("username")} type="text" placeholder="Username" required />
                <input {...register("email")} type="email" placeholder="Email" required />
                <input {...register("password")} type="password" placeholder="Password" required />
                <input type="submit" value="계정 생성"/>
            </form>
        </>
    );
}