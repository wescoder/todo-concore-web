import Head from 'next/head'
import Layout from '@components/layout'
import Login from '@components/login'

export const Home = () => {
  return (
    <Layout pageTitle='To Do'>
      <Head>
        <title>To Do</title>
      </Head>
      <Login />
    </Layout>
  )
}

export default Home
