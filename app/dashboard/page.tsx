"use client";
import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createRandomPassword } from "@/lib/utils";
import { createNewUser } from "@/lib/pocketbase";

// Layout component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sidebarItems = [
    { icon: 'Icon', label: 'Dashboard' },
    { icon: 'Icon', label: 'Sales Overview' },
    { icon: 'Icon', label: 'Sales by Rep' },
    { icon: 'Icon', label: 'Inventory Levels' },
    { icon: 'Icon', label: 'Product Categories' },
    { icon: 'Icon', label: 'Product Performance' },
    { icon: 'Icon', label: 'Inventory Movements' },
    { icon: 'Icon', label: 'Supplier Performance' },
    { icon: 'Icon', label: 'Cost Breakdowns' },
    { icon: 'Icon', label: 'Settings' },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar>
        <SidebarBody>{sidebarItems.map((item, index) => (
          <SidebarLink key={index} link={{ label: item.label, href: '/', icon: item.icon }} />))}
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>

  )
};

// Define chart data (replace with your actual data)
const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 15000, 20000, 18000, 22000],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    },
  ],
};

const productSegmentData = {
  labels: ['Electronics', 'Clothing', 'Books'],
  datasets: [
    {
      data: [30, 40, 30],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

// Placeholder component for charts
const ChartComponent = ({ data, type }: { data: any, type: 'bar' | 'pie' }) => (
  <div>
    {type === 'bar' ? <Bar data={data} /> : <Pie data={data} />}
  </div>
);



// Header component
const Header = () => (
  <header className="bg-white shadow w-full">
    <div className="container mx-auto px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">
        Logo
      </div>
      <div className="flex items-center">
        {/* User options here */}
        <span className="text-gray-600 mr-4">User Name</span>
        {/* Add user icon/dropdown here */}
      </div>
    </div>
  </header>
);

// Dashboard page component
const Dashboard: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(createRandomPassword());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState('');


  const handleSubmit = async () => {
    try {
      await createNewUser(email, password, name);
      setMessage('User created successfully!');
      setIsModalOpen(false);
      setName('');
      setEmail('');
    } catch (error: any) {
      setMessage(`Error creating user: ${error.message}`);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Add User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  value={password}
                  className="col-span-3"
                  readOnly
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSubmit}>
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {message && <p>{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {['Revenue Overview', 'Product Segment', 'Top Sales', 'Sales by Region', 'Customer Count', 'Customer Growth'].map((title, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4">
            <h3 className="font-medium text-gray-800">{title}</h3>
            <div className="mt-2">
              {/* Placeholder for chart */}
              {title === 'Revenue Overview' && <ChartComponent data={revenueData} type="bar" />}
              {title === 'Product Segment' && <ChartComponent data={productSegmentData} type="pie" />}
              {title !== 'Revenue Overview' && title !== 'Product Segment' && <p>Chart Placeholder</p>}
            </div>
          </div>
        ))}
      </div>

    </Layout>
  );
};

export default Dashboard;