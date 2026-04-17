import { Outlet } from "react-router"
import PageLayout from "./components/page-layout"

const App = () => {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  )
}

export default App