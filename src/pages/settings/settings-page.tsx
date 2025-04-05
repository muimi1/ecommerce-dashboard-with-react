
import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save, Upload, RefreshCw, Key, Mail, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  
  const [settings, setSettings] = useState({
    storeName: "E-Commerce",
    storeEmail: "contact@ecommerce.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Commerce St, New York, NY 10001",
    storeLogo: "/placeholder.svg",
    currency: "USD",
    weightUnit: "kg",
    enableRegistration: true,
    enableGuestCheckout: true,
    enableReviews: true,
    enableWishlist: true,
    enableDarkMode: true,
    enableNotifications: true,
    emailHost: "smtp.example.com",
    emailPort: "587",
    emailUsername: "notifications@prismecommerce.com",
    emailPassword: "••••••••••••",
    emailFromName: "E-Commerce",
    emailFromAddress: "notifications@prismecommerce.com",
    apiKey: "sk_••••••••••••••••••••••••••••••",
    webhookSecret: "whsec_••••••••••••••••••••••",
    taxRate: 7.5,
    shippingMethods: [
      { id: "1", name: "Standard Shipping", cost: 5.99, estimatedDays: "3-5" },
      { id: "2", name: "Express Shipping", cost: 15.99, estimatedDays: "1-2" },
      { id: "3", name: "Free Shipping", cost: 0, estimatedDays: "5-7", minimumOrderAmount: 50 }
    ]
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setSettings(prev => ({ ...prev, [name]: value }))
  }
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <Button size="sm">
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>
      
      <Tabs defaultValue="general" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>
                  Basic information about your store
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input 
                    id="storeName" 
                    name="storeName" 
                    value={settings.storeName} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Store Email</Label>
                    <Input 
                      id="storeEmail" 
                      name="storeEmail" 
                      type="email"
                      value={settings.storeEmail} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Store Phone</Label>
                    <Input 
                      id="storePhone" 
                      name="storePhone" 
                      value={settings.storePhone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Store Address</Label>
                  <Textarea 
                    id="storeAddress" 
                    name="storeAddress" 
                    value={settings.storeAddress} 
                    onChange={handleInputChange} 
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeLogo">Store Logo</Label>
                  <div className="flex items-center gap-4">
                    <img 
                      src={settings.storeLogo} 
                      alt="Store logo" 
                      className="h-16 w-16 rounded-md border object-contain p-1" 
                    />
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Logo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>
                  Configure regional preferences and units
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select 
                      value={settings.currency}
                      onValueChange={(value) => handleSelectChange("currency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weightUnit">Weight Unit</Label>
                    <Select 
                      value={settings.weightUnit}
                      onValueChange={(value) => handleSelectChange("weightUnit", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a weight unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="lb">Pounds (lb)</SelectItem>
                        <SelectItem value="oz">Ounces (oz)</SelectItem>
                        <SelectItem value="g">Grams (g)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                  <Input 
                    id="taxRate" 
                    name="taxRate" 
                    type="number"
                    value={settings.taxRate} 
                    onChange={handleInputChange} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Store Features</CardTitle>
                <CardDescription>
                  Enable or disable store features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableRegistration">User Registration</Label>
                    <p className="text-xs text-muted-foreground">Allow users to create accounts</p>
                  </div>
                  <Switch 
                    id="enableRegistration" 
                    checked={settings.enableRegistration}
                    onCheckedChange={(checked) => handleSwitchChange("enableRegistration", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableGuestCheckout">Guest Checkout</Label>
                    <p className="text-xs text-muted-foreground">Allow checkout without account</p>
                  </div>
                  <Switch 
                    id="enableGuestCheckout" 
                    checked={settings.enableGuestCheckout}
                    onCheckedChange={(checked) => handleSwitchChange("enableGuestCheckout", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableReviews">Product Reviews</Label>
                    <p className="text-xs text-muted-foreground">Allow customers to leave reviews</p>
                  </div>
                  <Switch 
                    id="enableReviews" 
                    checked={settings.enableReviews}
                    onCheckedChange={(checked) => handleSwitchChange("enableReviews", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableWishlist">Wishlist Feature</Label>
                    <p className="text-xs text-muted-foreground">Allow customers to save products for later</p>
                  </div>
                  <Switch 
                    id="enableWishlist" 
                    checked={settings.enableWishlist}
                    onCheckedChange={(checked) => handleSwitchChange("enableWishlist", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableDarkMode">Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">Enable dark mode in the admin panel</p>
                  </div>
                  <Switch 
                    id="enableDarkMode" 
                    checked={settings.enableDarkMode}
                    onCheckedChange={(checked) => handleSwitchChange("enableDarkMode", checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableNotifications">Notifications</Label>
                    <p className="text-xs text-muted-foreground">Enable browser notifications for new orders</p>
                  </div>
                  <Switch 
                    id="enableNotifications" 
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("enableNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>
                  Configure email sending settings for your store
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertTitle>Email Configuration</AlertTitle>
                  <AlertDescription>
                    Ensure your email settings are correct to avoid sending issues.
                  </AlertDescription>
                </Alert>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="emailHost">SMTP Host</Label>
                    <Input 
                      id="emailHost" 
                      name="emailHost" 
                      value={settings.emailHost} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailPort">SMTP Port</Label>
                    <Input 
                      id="emailPort" 
                      name="emailPort" 
                      value={settings.emailPort} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="emailUsername">SMTP Username</Label>
                    <Input 
                      id="emailUsername" 
                      name="emailUsername" 
                      value={settings.emailUsername} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailPassword">SMTP Password</Label>
                    <Input 
                      id="emailPassword" 
                      name="emailPassword" 
                      type="password"
                      value={settings.emailPassword} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="emailFromName">From Name</Label>
                    <Input 
                      id="emailFromName" 
                      name="emailFromName" 
                      value={settings.emailFromName} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailFromAddress">From Address</Label>
                    <Input 
                      id="emailFromAddress" 
                      name="emailFromAddress" 
                      type="email"
                      value={settings.emailFromAddress} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Test Email Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Integration</CardTitle>
                <CardDescription>
                  Configure payment gateway settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Security Notice</AlertTitle>
                  <AlertDescription>
                    Never share API keys or webhook secrets with unauthorized individuals.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="apiKey" 
                      name="apiKey" 
                      type="password"
                      value={settings.apiKey} 
                      onChange={handleInputChange}
                      className="flex-1" 
                    />
                    <Button variant="outline" size="icon">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Used for authenticating with the payment gateway</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhookSecret">Webhook Secret</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="webhookSecret" 
                      name="webhookSecret" 
                      type="password"
                      value={settings.webhookSecret} 
                      onChange={handleInputChange}
                      className="flex-1" 
                    />
                    <Button variant="outline" size="icon">
                      <Key className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Used to verify webhook signatures</p>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">
                    Verify Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shipping" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Methods</CardTitle>
                <CardDescription>
                  Configure shipping options for your store
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {settings.shippingMethods.map((method, index) => (
                  <div key={method.id} className={`space-y-4 ${index > 0 ? "pt-4 border-t" : ""}`}>
                    <div className="flex justify-between">
                      <h3 className="font-medium">{method.name}</h3>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Cost</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5">$</span>
                          <Input 
                            value={method.cost} 
                            className="pl-8" 
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Estimated Delivery</Label>
                        <Input 
                          value={`${method.estimatedDays} days`} 
                          readOnly
                        />
                      </div>
                      {method.minimumOrderAmount && (
                        <div className="space-y-2">
                          <Label>Minimum Order</Label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5">$</span>
                            <Input 
                              value={method.minimumOrderAmount} 
                              className="pl-8" 
                              readOnly
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <Button className="mt-4">
                  Add Shipping Method
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
