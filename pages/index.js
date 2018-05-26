import Layout from '@components/layout'
import cx from 'classnames'
import Head from 'next/head'
import s from './index.scss'

export const Home = () => (
  <Layout pageTitle='ToDo'>
    <Head>
      <title>ToDo</title>
    </Head>
    <h1 className={cx(s.pageTitle)}>ToDo</h1>
  </Layout>
)

export default Home
