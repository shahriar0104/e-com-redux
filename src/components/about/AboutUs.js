const AboutUs = () => {
    return (
        <div
            className="max-w-2xl mx-auto py-4 px-2 sm:py-8 sm:px-4 lg:py-16 lg:max-w-7xl lg:px-8 grid grid-cols-1 lg:grid-cols-4">
            <div className="lg:col-start-2 flex flex-row lg:flex-col justify-center
                          items-center lg:items-end pb-4 lg:pr-8 border-b-2 lg:border-b-0 lg:border-r-2
                          space-x-2 sm:space-x-4 lg:space-y-2">
                <span className="text-red-500 font-bold text-3xl sm:text-4xl lg:text-6xl tracking-wider">WHO</span>
                <span className="font-bold text-3xl sm:text-4xl lg:text-6xl tracking-wider">WE</span>
                <span className="font-bold text-3xl sm:text-4xl lg:text-6xl tracking-wider">ARE</span>
            </div>

            <div className="lg:col-start-3 pt-4 lg:pl-8">
                <p><span className="font-bold text-red-500">DSI-e.com</span> is a premium provider of supplements around the world.
                    It preserves the reputation of providing services to mass people.
                    <br/>
                    <br/>
                    We assure you that we make difference in our every step from hand to machine.
                    We make similarity in our difference.
                </p>
            </div>
        </div>
    )
}

export default AboutUs;
