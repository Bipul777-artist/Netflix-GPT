const Footer = () => {
    return (
        <div className="bg-black z-10 w-full py-4 h-full">
            <h3 className="text-white ml-10 py-4 text-xl md:ml-32 md:text-2xl">Questions ? Please call.</h3>
            <div className="text-white w-3/4 mx-auto md:grid md:grid-cols-4">
                
                <div className="md:col-span-1 cursor-pointer underline block">
                    <p className="py-2">FAQ</p>
                    <p className="py-2">Investor Relation</p>
                    <p className="py-2">Speed Test</p>
                    <p className="py-2">Privacy</p>
                </div>
                <div className="md:col-span-1 cursor-pointer underline block">
                    <p className="py-2">Help Center</p>
                    <p className="py-2">Jobs</p>
                    <p className="py-2">Cookie Preference</p>
                    <p className="py-2">Jobs</p>
                </div>
                <div className="md:col-span-1 cursor-pointer underline block">
                    <p className="py-2">Legal Notice</p>
                    <p className="py-2">Accounts</p>
                    <p className="py-2">Ways to Watch</p>
                    <p className="py-2">Privacy</p>
                </div>
                <div className="md:col-span-1 cursor-pointer underline block">
                    <p className="py-2">Media Center</p>
                    <p className="py-2">Terms of Use</p>
                    <p className="py-2">Contact Us</p>
                    
                </div>

            </div>
            <h3 className="text-center py-4 text-white">Made with ❤ by Bipul</h3>
        </div>
    )
}

export default Footer;