import { Frog, Button } from 'frog'
//import { exploreDelegatesFrame } from './frames/exploreDelegatesFrame.js';
//import {getStats } from './service/statsService.js';
//import { DelegatesResponseDTO } from './service/delegatesResponseDTO.js';
//import { errorFrame } from './frames/errorFrame.js';
//import { noVerifiedAddressFrame } from './frames/noVerifiedAddressFrame.js';
//import { noDelegateFrame } from './frames/noDelegateFrame.js';
//import { goodDelegateFrame } from './frames/goodDelegateFrame.js';
//import { badDelegateFrame } from './frames/badDelegateFrame.js';
 
export const delegatesStatsFrame = new Frog({
  //basePath: '/api/delegatesStats',
  title: 'Delegates Stats Frame',
})
 
delegatesStatsFrame.frame('/', async (c) => {
  const {  verified } = c;
  //const { fid } = frameData || {}    
/*   const { inputText } = c;
  const fid = inputText === undefined ? c.frameData?.fid : Number(inputText) */

  if (!verified){
    return c.res({
      image: `${process.env.IMAGE_URL}/Frame_4_not_verified.png`,
      imageAspectRatio: '1.91:1',
      intents: [
          <Button.Reset>Try again</Button.Reset>,
      ],
  })
  } 

  return c.res({
    image: `${process.env.IMAGE_URL}/Frame_6_error.png`,
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

//delegatesStatsFrame.route('/exploreDelegates', exploreDelegatesFrame)