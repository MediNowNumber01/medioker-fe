import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Store,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Activity,
  UserCheck,
  Building2,
} from "lucide-react"
import Link from "next/link"

export default function SuperAdminDashboard() {
  // Dummy data
  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Pharmacies",
      value: "89",
      change: "+3",
      trend: "up",
      icon: Store,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Products",
      value: "5,234",
      change: "+156",
      trend: "up",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Monthly Revenue",
      value: "$45,678",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "user_registered",
      message: "New user registered: john.doe@email.com",
      time: "2 minutes ago",
      icon: Users,
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "pharmacy_approved",
      message: "Pharmacy 'HealthCare Plus' has been approved",
      time: "15 minutes ago",
      icon: Store,
      color: "text-green-600",
    },
    {
      id: 3,
      type: "product_added",
      message: "New product 'Paracetamol 500mg' added to catalog",
      time: "1 hour ago",
      icon: Package,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "order_completed",
      message: "Order #12345 has been completed successfully",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 5,
      type: "admin_created",
      message: "New admin account created for Sarah Wilson",
      time: "3 hours ago",
      icon: UserCheck,
      color: "text-indigo-600",
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: "pharmacy",
      name: "MediCare Pharmacy",
      location: "Jakarta, Indonesia",
      submittedAt: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      type: "pharmacy",
      name: "Quick Health Store",
      location: "Surabaya, Indonesia",
      submittedAt: "2024-01-14",
      status: "pending",
    },
    {
      id: 3,
      type: "product",
      name: "Vitamin D3 1000IU",
      category: "Supplements",
      submittedAt: "2024-01-13",
      status: "pending",
    },
  ]

  const systemHealth = [
    {
      service: "API Server",
      status: "healthy",
      uptime: "99.9%",
      lastCheck: "1 min ago",
    },
    {
      service: "Database",
      status: "healthy",
      uptime: "99.8%",
      lastCheck: "1 min ago",
    },
    {
      service: "Payment Gateway",
      status: "warning",
      uptime: "98.5%",
      lastCheck: "2 min ago",
    },
    {
      service: "Email Service",
      status: "healthy",
      uptime: "99.7%",
      lastCheck: "1 min ago",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back, Super Admin!</h1>
        <p className="text-muted-foreground">Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    <span className="text-sm text-muted-foreground">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest platform activities and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className={`p-2 rounded-full bg-muted`}>
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                View All Activities
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Approvals
              <Badge variant="secondary" className="ml-auto">
                {pendingApprovals.length}
              </Badge>
            </CardTitle>
            <CardDescription>Items waiting for your approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-yellow-100">
                    {item.type === "pharmacy" ? (
                      <Building2 className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <Package className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.type === "pharmacy" ? item.location : item.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {item.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Link href="/superadmin/approvals">
                <Button variant="outline" size="sm" className="w-full">
                  View All Pending
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>Monitor platform services and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        service.status === "healthy"
                          ? "bg-green-500"
                          : service.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm">{service.service}</p>
                      <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        service.status === "healthy"
                          ? "default"
                          : service.status === "warning"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {service.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{service.lastCheck}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/superadmin/accounts/admin">
              <Button variant="outline" className="w-full justify-start gap-2">
                <UserCheck className="h-4 w-4" />
                Create Admin Account
              </Button>
            </Link>
            <Link href="/superadmin/pharmacies">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Store className="h-4 w-4" />
                Manage Pharmacies
              </Button>
            </Link>
            <Link href="/superadmin/products">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Package className="h-4 w-4" />
                Add New Product
              </Button>
            </Link>
            <Link href="/superadmin/accounts">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                View All Users
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start gap-2">
              <AlertTriangle className="h-4 w-4" />
              System Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
