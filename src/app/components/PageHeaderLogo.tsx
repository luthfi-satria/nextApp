import Image from "next/image";

export default function PageHeaderLogo(){
    return (
        <div className="flex items-center">
            <a href="/" className="flex items-center outline-none">
                <Image
                    src="/assets/images/logo/logo.png"
                    alt="default logo"
                    width={74}
                    height={23}
                />
            </a>
        </div>
    );
}