'use client'
import { MRE } from '../../types'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

interface Property {
  property_picture: string
  postal_code: string
  sale_method: string
  deposit: string
  sale_price: string
  management_cost: string
  exclusive_area: number
  gross_leasable_area: number
  direction: string
  floor: number
  total_floors: number
  room: number
  washroom: number
  parking: string
  availability: string
  year_built: number
  property_id: number
}

interface PropertyDetailComponentProps {
  propertyType: string
}

const PropertyDetailComponent: React.FC<PropertyDetailComponentProps> = ({
  propertyType,
}) => {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      const observer = new IntersectionObserver(handleObserver, {
        threshold: 1,
      })
      observer.observe(containerRef.current)
    }
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `/api/mockup/${propertyType}/details/${page}`,
      )

      const data: MRE[] = response.data
      const processData: Property[] = data.map((mre: MRE) => ({
        property_picture: mre.property_picture,
        postal_code: mre.postal_code,
        sale_method: mre.sale_method,
        deposit: mre.deposit,
        sale_price: mre.sale_price,
        management_cost: mre.management_cost,
        exclusive_area: mre.exclusive_area,
        gross_leasable_area: mre.gross_leasable_area,
        direction: mre.direction,
        floor: mre.floor,
        total_floors: mre.total_floors,
        room: mre.room,
        washroom: mre.washroom,
        parking: mre.parking,
        availability: mre.availability,
        year_built: mre.year_built,
        property_id: mre.property_id,
      }))
      setProperties((prevProperties) => [...prevProperties, ...processData])
      setPage((prevPage) => prevPage + 1)
      setIsLoading(false)
    } catch (error) {
      console.error('🦖 에러메세지: ', error)
      setIsLoading(false)
    }
  }

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting) {
      const id = target.target.getAttribute('data-id')
      if (id) {
        fetchData()
      }
    }
  }

  return (
    <>
      {properties.map((property, index) => (
        <div key={index} data-id={property.property_id}>
          <p>오피스텔 상세 페이지입니다.</p>
          <p>위치: {property.postal_code} 도로명 주소</p>
          <img src={property.property_picture} alt="매물 사진" />
          <p>매물 정보:</p>
          <ul>
            <li>전세/월세: {property.sale_method}</li>
            <li>보증금: {property.deposit}</li>
            <li>월세: {property.sale_price}</li>
            <li>관리비: {property.management_cost}</li>
            <li>전용 면적: {property.exclusive_area}</li>
            <li>공급 면적: {property.gross_leasable_area}</li>
            <li>방향: {property.direction}</li>
            <li>층수: {property.floor}</li>
            <li>총 층수: {property.total_floors}</li>
            <li>
              방/화장실 개수: {property.room}/{property.washroom}
            </li>
            <li>주차 여부: {property.parking}</li>
            <li>입주 가능일: {property.availability}</li>
            <li>건축년도: {property.year_built}</li>
          </ul>
        </div>
      ))}
      <div ref={containerRef} style={{ height: '100vh' }}>
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  )
}

export default PropertyDetailComponent