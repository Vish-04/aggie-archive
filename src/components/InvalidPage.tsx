import Link from 'next/link';

export default function InvalidPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Invalid Class</h2>
                <p className="text-gray-600 mb-8">The class you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.</p>
                <Link 
                    href="/" 
                    className="inline-block bg-red hover:bg-red/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                    Return Home
                </Link>
            </div>
        </div>
    );
}