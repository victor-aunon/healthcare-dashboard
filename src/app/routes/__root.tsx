import type { RouterContext } from '@/app/router'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
})
