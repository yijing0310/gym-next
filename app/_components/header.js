'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import headerstyles from './_styles/header.module.css'
import { FaCartPlus } from 'react-icons/fa'
import { useAuth } from '@/context/auth-context'
import { AVATAR_PATH } from '@/config/api-path'

export default function Header() {
  const [isScrolling, setIsScrolling] = useState(false)
  const { auth, logout } = useAuth()

  const pathname = usePathname() // 使用 Next.js 的 usePathname 來取得當前路徑

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 36) {
        setIsScrolling(true)
      } else {
        setIsScrolling(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // 清理事件監聽器
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  // 判斷是否要隱藏 Header
  if (pathname.startsWith('/member' || '/member/register')) {
    return null // `/member` 底下的頁面不顯示 Header
  }
  // const hideHeaderPages = [
  //   '/member/login',
  //   '/member/register',
  //   '/member',
  //   '/member/forgot-password',
  //   '/member/register/add-profile',
  // ]
  // if (hideHeaderPages.includes(pathname)) {
  //   return null // 這些頁面不顯示 Header
  // }

  return (
    <>
      <div
        className={`${headerstyles.header} ${
          isScrolling ? headerstyles.hscrolling : ''
        }`}
      >
        {/* LOGO */}
        <div>
          <Link href="/" className={headerstyles.logo}>
            <Image
              src="/gym-logo-white.svg"
              alt="Logo"
              width={130}
              height={40}
            />
          </Link>
        </div>

        {/* 導航選單 */}
        <div className={headerstyles.navMenu}>
          <Link href="/coaches" className={headerstyles.navLink}>
            找GYM身教練
          </Link>
          <Link href="/articles" className={headerstyles.navLink}>
            GYM享知識
          </Link>
          <Link href="/locations" className={headerstyles.navLink}>
            找GYM點
          </Link>
          <Link href="/friends" className={headerstyles.navLink}>
            找GYM友
          </Link>
          <Link href="/friend-list" className={headerstyles.navLink}>
            好友列表
          </Link>
          <Link href="/videos" className={headerstyles.navLink}>
            影片
          </Link>
          <Link href="/products" className={headerstyles.navLink}>
            產品
          </Link>
        </div>

        {/* 右側圖示與搜尋欄 */}
        <div className={headerstyles.rightSection}>
          {auth.id ? (
            <>
              <Link href="/member" className={headerstyles.navLink}>
                <div className={headerstyles.navAvatar}>
                <span>{auth.name?auth.name:'hello'}</span>
                </div>
              </Link>
              <a
                href="/qs"
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
                className={headerstyles.navLink}
              >
                登出
              </a>
            </>
          ) : (
            <>
              {/* 登入按鈕 */}
              <Link href="/member/login" className={headerstyles.navLink}>
                登入
              </Link>
              {/* 註冊按鈕 */}
              <Link href="member/register" className={headerstyles.navLink}>
                註冊
              </Link>
            </>
          )}
          <Link href="/carts" className={headerstyles.navLink}>
            <FaCartPlus />
          </Link>
        </div>
      </div>
    </>
  )
}
