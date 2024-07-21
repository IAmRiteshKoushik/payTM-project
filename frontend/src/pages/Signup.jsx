import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
    return(
        <div className="bg-slate-300 h-screen flex justify-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign Up"}/>
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox placeholder="John" label={"First Name"} />
                    <InputBox placeholder="Doe" label={"Last Name"} />
                    <InputBox placeholder="example@email.com" label={"Email"} />
                    <InputBox placeholder="123123" label={"Password"} />
                    <div className="pt-4">
                        <Button label={"Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
                </div>
            </div>
        </div>
    );
}