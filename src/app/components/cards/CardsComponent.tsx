type Cards = {
    title: String
    counter: Number,
};

export default function CardsComponent({
    cardsData
}:Readonly<{cardsData: Cards[]}>){
    return (
        <div className="card w-full relative overflow-hidden">
            <div className="grid gap-0 xl:gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                {cardsData.map((items, key) => (
                    <div key={key} className="col-span-4 xs:col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-1 border-r border-dashed dark:border-slate-700 border-b xl:border-b-0">
                        <div className="p-4 text-center">
                            <span className="my-1 font-semibold text-2xl dark:text-slate-200">
                                {items.title}
                            </span>
                            <h6 className="uppercase text-slate-400 my-2 text-xs font-semibold">
                                Total Data: {items.counter.toString()}
                            </h6>
                        </div>
                    </div>
                ) )}
            </div>
        </div>
    );
}