'use client'

import friendStyle from '../_styles/friends.module.css'

export default function FriendBanner() {
  return (
    <>
      <div className={friendStyle.banner}>
        <h3>找GYM友</h3>
        <p>尋找有相同運動愛好的朋友，一起GYM步吧！</p>
      </div>
    </>
  )
}
