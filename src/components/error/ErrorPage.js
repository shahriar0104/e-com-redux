import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div
            className="max-w-2xl mx-auto py-4 px-2 sm:py-8 sm:px-4 lg:py-16 lg:max-w-7xl lg:px-8 grid grid-cols-1 lg:grid-cols-6">
            <div className="lg:col-start-2 flex flex-row lg:flex-col justify-center
                          items-center lg:items-end pb-4 lg:pr-8 border-b-2 lg:border-b-0 lg:border-r-2
                          space-x-2 sm:space-x-4 lg:space-y-2">
                <span className="text-red-500 font-bold text-3xl sm:text-4xl lg:text-6xl tracking-wider">404</span>
            </div>

            <div className="lg:col-start-3 lg:col-span-3 pt-4 lg:pl-8 flex flex-col justify-center">
                <p className="font-bold text-3xl sm:text-4xl lg:text-6xl text-center lg:text-left">
                    Page Not Found
                </p>
                <p className="text-gray-500 mt-2 mb-8 text-center lg:text-left">Please check the URL in the address bar
                    and try again.</p>
                <Link to="/" className="text-center lg:text-left">
                    <button
                        className="inline-block bg-indigo-700 text-white font-medium px-4 py-2 rounded shadow hover:bg-indigo-900">
                        Go back home
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage;
