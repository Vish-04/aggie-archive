import { useUser } from '@auth0/nextjs-auth0/client';

export default function Dashboard() {
    const { user, isLoading } = useUser()
    if(isLoading) {
        return (
          <div className="">
            Loading...  
          </div>
        );
      } else {
        return(
            <div>

            </div>
        );
    }
}