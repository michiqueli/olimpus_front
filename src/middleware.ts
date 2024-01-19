export {default} from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
 
export const config = { matcher : ['/adminDashboard', '/allUsers', '/pasarelaPagos', '/userDetail', '/account']}

export async function middleware(req: NextRequest) {
  
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
 
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
 
  return NextResponse.next();
}
