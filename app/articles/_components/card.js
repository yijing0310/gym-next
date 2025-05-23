'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import articlesStyle from '../styles/articles.module.css'
import { ARTICLE_FAV } from '@/config/api-path'
import { useAuth } from '@/context/auth-context'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export default function Card({
  articles = {
    category_id: 0,
    content: '',
    created_at: '',
    id: 0,
    imageURL: '',
    intro: '',
    title: '',
    updated_at: '',
    views: 0,
  },
  setIsLoding = () => {},
  setIsLike = () => {},
}) {
  const { auth, getAuthHeader } = useAuth()
  const router = useRouter()
  const [like, setLike] = useState(articles.like_id || false)
  const [listData, setListData] = useState({
    success: false,
    perpage: 0,
    totalRows: 0,
    totalPages: 0,
    page: 0,
    rows: [],
    keyword: '',
  })

  const toggleLike = (e, article_id) => {
    e.preventDefault()
    fetch(`${ARTICLE_FAV}/${article_id}`, { headers: { ...getAuthHeader() } })
      .then((r) => r.json())
      .then((result) => {
        console.log(result)
        if (result.error == '需要登入會員') {
          needlogin()
          return
        }
        if (result.success) {
          setLike(!like)
          setIsLike(like)
        }
      })
      .catch((error) => {
        console.error('Error while updating favorite status:', error)
        setIsLoding(false)
      })
  }
  const needlogin = () => {
    document.body.style.overflow = 'hidden' //畫面不要偏移使用
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: '登入會員即可收藏!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f87808',
      cancelButtonColor: '#333',
      confirmButtonText: '登入',
      cancelButtonText: '取消',
      didClose: () => {
        //畫面不要偏移使用
        document.body.style.overflow = '' // 恢復頁面滾動
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/member/login')
      }
    })
  }
  const date = moment(articles.created_at).format('YYYY/MM/DD')
  
  return (
    <>
      <Link href={`/articles/${articles.id}`}>
        <div className={articlesStyle.card}>
          <div className={articlesStyle.images}>
            <Image
              src={`${articles.imageURL}`}
              width={335}
              height={250}
              alt={articles.title}
            />
            <div className={articlesStyle.heartArea}>
              {like ? (
                <FaHeart
                  className={articlesStyle.heartActive}
                  onClick={(e) => toggleLike(e, articles.id)}
                />
              ) : (
                <FaRegHeart
                  className={articlesStyle.heart}
                  onClick={(e) => toggleLike(e, articles.id)}
                />
              )}
            </div>
          </div>
          <div className={articlesStyle.content}>
            <h5>{articles.title}</h5>
            <pre>
              <IoMdTime /> &nbsp;{date} &nbsp;&nbsp;&nbsp;
            </pre>
            <p>{articles.intro}</p>
          </div>
        </div>
      </Link>
    </>
  )
}
