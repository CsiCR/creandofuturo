import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import AnnouncementBanner from '../components/AnnouncementBanner';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-ps-green selection:text-ps-black">
            <AnnouncementBanner />
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};

export default Layout;
