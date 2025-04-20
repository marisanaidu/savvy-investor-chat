
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Lock, User, Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile settings saved successfully");
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password updated successfully");
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Notification preferences updated");
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Security settings updated");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-finance-primary">Account Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="sticky top-6 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 bg-finance-primary rounded-full text-white flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold">JD</span>
                  </div>
                  <h3 className="text-xl font-medium">John Doe</h3>
                  <p className="text-gray-500 text-sm">user@example.com</p>
                  <Button variant="outline" className="mt-4 w-full">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <a 
                    href="#profile" 
                    className="flex items-center px-3 py-2 text-sm rounded-md bg-finance-secondary/10 text-finance-secondary font-medium"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </a>
                  <a 
                    href="#password" 
                    className="flex items-center px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Password
                  </a>
                  <a 
                    href="#notifications" 
                    className="flex items-center px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </a>
                  <a 
                    href="#security" 
                    className="flex items-center px-3 py-2 text-sm rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card id="profile">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <Input defaultValue="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <Input defaultValue="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input defaultValue="user@example.com" type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input defaultValue="+1 (555) 123-4567" type="tel" />
                </div>
                <Button type="submit" className="bg-finance-primary hover:bg-finance-primary/90">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card id="password">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSavePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="bg-finance-primary hover:bg-finance-primary/90">
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card id="notifications">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveNotifications} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pushNotifications}
                      onChange={() => setPushNotifications(!pushNotifications)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <Button type="submit" className="bg-finance-primary hover:bg-finance-primary/90">
                  Save Preferences
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card id="security">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security options</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSecurity} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactor}
                      onChange={() => setTwoFactor(!twoFactor)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="bg-finance-primary hover:bg-finance-primary/90">
                    Save Settings
                  </Button>
                </div>
              </form>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Login from New York, USA</p>
                      <p className="text-xs text-gray-500">IP: 192.168.1.1</p>
                    </div>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Password Changed</p>
                      <p className="text-xs text-gray-500">From account settings</p>
                    </div>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Login from Boston, USA</p>
                      <p className="text-xs text-gray-500">IP: 192.168.1.5</p>
                    </div>
                    <p className="text-xs text-gray-500">5 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;