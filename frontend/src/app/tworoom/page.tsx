'use client'

import dynamic from 'next/dynamic'

const PropertyComponent = dynamic(
  () => import('@/components/PropertyComponent/PropertyComponent'),
  {
    ssr: false,
  },
)

const TworoomPage = () => {
  return (
    <>
      <PropertyComponent propertyType="tworoom" />
    </>
  )
}

export default TworoomPage
