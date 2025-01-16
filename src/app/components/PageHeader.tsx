import PageHeaderLogo from "./PageHeaderLogo"
import PageHeaderNav from "./PageHeaderNav";
import PageHeaderNavRight from "./PageHeaderNavRight";

export default function PageHeader(){
    return (
        <nav className="pageHeader border-gray-200 bg-gray-900 p-2.5 shadow-sm dark:bg-slate-800 sm:px-4 sticky top-0 print:hidden w-full z-10">
            <div className="container mx-0 flex max-w-full flex-wrap items-center lg:mx-auto">
                <PageHeaderLogo/>
                <PageHeaderNav/>
                <PageHeaderNavRight/>
            </div>
        </nav>
    );
}