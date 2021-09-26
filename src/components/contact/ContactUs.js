import {MailIcon, PhoneIcon} from "@heroicons/react/outline";

const ContactUs = () => {
    return (
        <div className="max-w-2xl mx-auto py-4 px-2 sm:py-8 sm:px-4 lg:py-16 lg:max-w-7xl lg:px-8 grid grid-cols-1 lg:grid-cols-4">
            <div className="bg-yellow-700 text-white lg:col-start-2 lg:col-span-2 p-4 rounded shadow-lg">
                <h1 className="text-4xl font-bold py-4">Contact Information</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                <div className="mt-8">
                    <PhoneIcon className="inline-block mr-4 h-6 w-6" aria-hidden="true"/>
                    <span>+8 (777) 123-4567</span>
                </div>

                <div className="mt-4">
                    <MailIcon className="inline-block mr-4 h-6 w-6" aria-hidden="true"/>
                    <span>support@dsi-ecom.com</span>
                </div>

                <div className="mt-4 flex justify-center items-center space-x-8">
                    <a href="https://www.facebook.com/DynamicSolutionInnovators/">
                        <i className="fa fa-facebook-official fa-2x text-gray-50 inline-block"/>
                    </a>
                    <a href="https://github.com/DSInnovators">
                        <i className="fa fa-github fa-2x text-gray-50 inline-block"/>
                    </a>
                    <a href="https://www.linkedin.com/company/dsinnovators">
                        <i className="fa fa-linkedin fa-2x text-gray-50 inline-block"/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;
