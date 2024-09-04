
import * as dotenv from 'dotenv'
dotenv.config();

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'

//import { app as delegatesStatsFrame } from './delegatesStatsFrame.tsx'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  hub: neynar({ apiKey: 'NEYNAR_FROG_FM' }),
  title: 'Delegates Frame',
/*   verify: 'silent', */
  imageOptions: {
    fonts: [
      {
        name: 'Koulen',
        weight: 400,
        source: 'google',
      }
    ]
  }
})


app.frame('/', (c) => {
  
  return c.res({
    image: `/Frame_1_start.png`,
    imageAspectRatio: '1.91:1',
    intents: [
      <TextInput placeholder="Enter fid..." />,
      <Button action="/delegatesStats">View Stats</Button>
    ],
  })
})

app.frame('/delegatesStats', async (c) => {
  const {  verified } = c;
  //const { fid } = frameData || {}    
/*   const { inputText } = c;
  const fid = inputText === undefined ? c.frameData?.fid : Number(inputText) */

  if (!verified){
    return c.res({
      image: `/Frame_4_not_verified.png`,
      imageAspectRatio: '1.91:1',
      intents: [
          <Button.Reset>Try again</Button.Reset>,
      ],
  })
  } 

  return c.res({
    image: `/Frame_6_error.png`,
    imageAspectRatio: '1.91:1',
    intents: [
      <Button.Reset>Try again</Button.Reset>,
    ],
  })

/*   if (fid === undefined){
    return c.res({
      image: `/Frame_6_error.png`,
      imageAspectRatio: '1.91:1',
      intents: [
        <Button.Reset>Try again</Button.Reset>,
      ],
    })
  }

  let delegate : DelegatesResponseDTO

  try {
    delegate = await getStats(fid)
  } catch (e) {
    return c.res({
      image: `/Frame_6_error.png`,
      imageAspectRatio: '1.91:1',
      intents: [
        <Button.Reset>Try again</Button.Reset>,
      ],
    })
  }  */




/* if(!delegate.hasVerifiedAddress) {
  return noVerifiedAddressFrame(c)
}   */ 
/*   delegate.hasVerifiedAddress = true
  delegate.hasDelegate = true
  delegate.isGoodDelegate = false */


/*   if(!delegate.hasDelegate) {
    return noDelegateFrame(c)
  } */
    //return noDelegateFrame(c)
/*   if(!delegate.isGoodDelegate) {
    return badDelegateFrame(fid, c)
  }

  return goodDelegateFrame(fid, c)   */  

})

//app.route('/delegatesStats', delegatesStatsFrame)

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)