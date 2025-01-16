export default function PageFooter(){
    return (
        <div className="page-footer fixed bottom-0 inset-x-2 block print:hidden">
            <div className="container mx-auto">
                <footer className="footer mt-4 rounded-t-md bg-white dark:bg-slate-800 p-4 text-center font-medium text-slate-600 dark:text-slate-400 shadow md:text-right">
                    &copy;
                    <span className="develop-by font-bold text-md ml-2">
                        Develop by
                    </span>
                    <span className="developer ml-2 text-orange-500">Me</span>
                </footer>
            </div>
        </div>
    );
}