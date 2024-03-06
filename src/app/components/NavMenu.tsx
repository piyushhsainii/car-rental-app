import DarkModeBtn from "./DarkModeBtn";
import { getServerSession } from "next-auth";
import Logo from "./Logo";
import SignOut from "./SignOut";


const NavMenu = async () => {
    // const session = await getServerSession()
    return (
        <div className="flex justify-between  h-[60px] px-4 " >
            <div className=" " >
                <Logo />
            </div>
            <div className="flex items-center gap-6 justify-center" >
                <div>
                    <DarkModeBtn />
                </div>
                <div className="font-semibold text-sm" >
                    <SignOut />
                </div>
            </div>
        </div>
    )

}

export default NavMenu;