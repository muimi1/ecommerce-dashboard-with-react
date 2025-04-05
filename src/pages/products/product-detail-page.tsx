
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Trash, Upload, LinkIcon, PlusCircle, MinusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock product data
const product = {
  id: "1",
  name: "Wireless Earbuds Pro",
  slug: "wireless-earbuds-pro",
  description: "High-quality wireless earbuds with noise cancellation feature. Includes charging case and multiple ear tip sizes for perfect fit.",
  price: 89.99,
  regularPrice: 129.99,
  salePrice: 89.99,
  sku: "PRD-001",
  stockQuantity: 145,
  category: "Electronics",
  status: "published",
  featured: true,
  imageUrl: "/placeholder.svg",
  images: [
    { id: "1", url: "/placeholder.svg", isPrimary: true },
    { id: "2", url: "/placeholder.svg", isPrimary: false },
    { id: "3", url: "/placeholder.svg", isPrimary: false }
  ],
  variations: [
    { id: "1", name: "Color", options: ["Black", "White", "Blue"] },
    { id: "2", name: "Storage", options: ["64GB", "128GB"] }
  ],
  tags: ["wireless", "audio", "bluetooth", "earbuds"]
}

// Sample reviews data
const reviews = [
  { id: "1", customer: "John Smith", rating: 5, comment: "Great product, very comfortable and excellent sound quality.", date: "2023-03-15" },
  { id: "2", customer: "Sarah Johnson", rating: 4, comment: "Good earbuds, battery life could be better.", date: "2023-03-10" },
  { id: "3", customer: "David Wilson", rating: 5, comment: "Amazing noise cancellation, worth every penny!", date: "2023-03-05" }
]

export function ProductDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [productData, setProductData] = useState(product)
  const [activeTab, setActiveTab] = useState("general")
  
  // Calculate the average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))
  }
  
  const handleGoBack = () => {
    navigate("/products")
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setProductData(prev => ({ ...prev, [name]: checked }))
  }
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Product Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="general" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Edit the basic product information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={productData.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <div className="flex">
                      <Input 
                        id="slug" 
                        name="slug" 
                        value={productData.slug} 
                        onChange={handleInputChange} 
                        className="rounded-r-none"
                      />
                      <Button variant="outline" size="icon" className="rounded-l-none">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Used in the URL: /products/{productData.slug}</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={productData.description} 
                      onChange={handleInputChange} 
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input 
                      id="category" 
                      name="category" 
                      value={productData.category} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>
                    Set the product pricing information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="regularPrice">Regular Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">$</span>
                      <Input 
                        id="regularPrice" 
                        name="regularPrice" 
                        type="number" 
                        value={productData.regularPrice} 
                        onChange={handleInputChange}
                        className="pl-8" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Sale Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">$</span>
                      <Input 
                        id="salePrice" 
                        name="salePrice" 
                        type="number" 
                        value={productData.salePrice} 
                        onChange={handleInputChange}
                        className="pl-8" 
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="featured">Featured Product</Label>
                      <p className="text-xs text-muted-foreground">Show this product on the home page</p>
                    </div>
                    <Switch 
                      id="featured" 
                      checked={productData.featured}
                      onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="status">Product Status</Label>
                      <p className="text-xs text-muted-foreground">Current status: <Badge variant="outline">{productData.status}</Badge></p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add tags to help customers find your product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {productData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">
                        <MinusCircle className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="gap-1">
                    <PlusCircle className="h-3 w-3" />
                    Add Tag
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Upload and manage product images
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {productData.images.map((image, index) => (
                    <div key={index} className="relative rounded-md border bg-muted/50 p-1">
                      <img 
                        src={image.url} 
                        alt={`Product image ${index + 1}`}
                        className="aspect-square w-full rounded object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:bg-black/50 hover:opacity-100">
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                      {image.isPrimary && (
                        <Badge className="absolute left-2 top-2">Primary</Badge>
                      )}
                    </div>
                  ))}
                  <div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                    <Button variant="outline" className="flex flex-col gap-2 h-auto py-8">
                      <Upload className="h-6 w-6" />
                      <span>Upload Image</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Information</CardTitle>
                <CardDescription>
                  Manage product inventory details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                    <Input 
                      id="sku" 
                      name="sku" 
                      value={productData.sku} 
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity">Stock Quantity</Label>
                    <Input 
                      id="stockQuantity" 
                      name="stockQuantity" 
                      type="number" 
                      value={productData.stockQuantity} 
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Product Variations</h3>
                  {productData.variations.map((variation, index) => (
                    <div key={index} className="mb-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{variation.name}</h4>
                        <Button variant="ghost" size="sm" className="gap-1 text-destructive">
                          <MinusCircle className="h-3 w-3" />
                          Remove
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {variation.options.map((option, optIndex) => (
                          <Badge key={optIndex} variant="outline">
                            {option}
                          </Badge>
                        ))}
                        <Button variant="outline" size="sm" className="gap-1">
                          <PlusCircle className="h-3 w-3" />
                          Add Option
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="gap-2 mt-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Variation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Customer Reviews</CardTitle>
                    <CardDescription>
                      Manage customer feedback and reviews
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
                    <div className="text-lg text-yellow-500">{renderStars(averageRating)}</div>
                    <div className="text-sm text-muted-foreground">({reviews.length} reviews)</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{review.customer[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{review.customer}</div>
                              <div className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</div>
                            </div>
                            <div className="text-yellow-500">{renderStars(review.rating)}</div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
