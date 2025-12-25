import { Button } from '@/components/ui/button'

function PageNotFound() {
    return (
        <div className="flex h-screen justify-center items-center">
            <div className='flex flex-col gap-6 justify-center items-center p-4'>
                <h2 className='mb-6 text-3xl font-semibold text-center'>Whoops!</h2>
                <p className='text-center text-lg md:text-xl'>The page you are looking for does not exist.</p>
                <Button asChild size='lg' className='rounded-lg text-base' variant="outline">
                    <a href='/login'>Back to home page</a>
                </Button>
            </div>
        </div>
    );
}

export default PageNotFound