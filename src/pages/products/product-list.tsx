
import { useState } from "react"
import { Link } from "react-router-dom"
import { DownloadIcon, FilterIcon, PlusIcon, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 129.99,
    stock: 65,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: 199.99,
    stock: 42,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Premium Leather Wallet",
    category: "Accessories",
    price: 49.99,
    stock: 120,
    status: "In Stock",
  },
  {
    id: 4,
    name: "Smartphone X Pro",
    category: "Electronics",
    price: 899.99,
    stock: 18,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    category: "Electronics",
    price: 34.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 6,
    name: "Ultra HD 4K Monitor",
    category: "Computers",
    price: 349.99,
    stock: 23,
    status: "In Stock",
  },
  {
    id: 7,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 189.99,
    stock: 15,
    status: "Low Stock",
  },
  {
    id: 8,
    name: "Gourmet Coffee Maker",
    category: "Kitchen",
    price: 79.99,
    stock: 42,
    status: "In Stock",
  },
]

export function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")

  // Filter products based on search term and category
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "All" || product.category === filterCategory)
  )

  // Get unique categories
  const categories = ["All", ...new Set(products.map((product) => product.category))]

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link to="/products/new">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
          <Button variant="secondary">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            Manage your product catalog. View, edit, and add new products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <FilterIcon className="mr-2 h-4 w-4" />
                  {filterCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setFilterCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <Link
                          to={`/products/${product.id}`}
                          className="hover:underline"
                        >
                          {product.name}
                        </Link>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">
                        ${product.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            product.status === "In Stock"
                              ? "outline"
                              : product.status === "Low Stock"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
