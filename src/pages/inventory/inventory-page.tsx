
import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Download, Filter, Plus, RefreshCw, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface InventoryItem {
  id: string
  sku: string
  name: string
  category: string
  stockLevel: number
  threshold: number
  supplier: string
  cost: number
  location: string
}

const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    sku: "PRD-001",
    name: "Wireless Earbuds",
    category: "Electronics",
    stockLevel: 145,
    threshold: 20,
    supplier: "TechSupplies Inc.",
    cost: 45.50,
    location: "Warehouse A"
  },
  {
    id: "2",
    sku: "PRD-002",
    name: "Smart Watch",
    category: "Electronics",
    stockLevel: 32,
    threshold: 15,
    supplier: "TechSupplies Inc.",
    cost: 78.95,
    location: "Warehouse A"
  },
  {
    id: "3",
    sku: "PRD-003",
    name: "Bluetooth Speaker",
    category: "Electronics",
    stockLevel: 8,
    threshold: 10,
    supplier: "AudioTech Co.",
    cost: 55.20,
    location: "Warehouse B"
  },
  {
    id: "4",
    sku: "PRD-004",
    name: "Cotton T-Shirt",
    category: "Apparel",
    stockLevel: 210,
    threshold: 50,
    supplier: "Clothing Wholesale Ltd.",
    cost: 12.75,
    location: "Warehouse C"
  },
  {
    id: "5",
    sku: "PRD-005",
    name: "Denim Jeans",
    category: "Apparel",
    stockLevel: 45,
    threshold: 20,
    supplier: "Clothing Wholesale Ltd.",
    cost: 25.99,
    location: "Warehouse C"
  },
  {
    id: "6",
    sku: "PRD-006",
    name: "Stainless Water Bottle",
    category: "Accessories",
    stockLevel: 3,
    threshold: 15,
    supplier: "EcoProducts Inc.",
    cost: 14.50,
    location: "Warehouse B"
  },
  {
    id: "7",
    sku: "PRD-007",
    name: "Leather Wallet",
    category: "Accessories",
    stockLevel: 18,
    threshold: 10,
    supplier: "LeatherGoods Co.",
    cost: 32.25,
    location: "Warehouse A"
  }
]

export function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredItems = inventoryItems.filter(
    item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const getStockLevelColor = (level: number, threshold: number) => {
    const ratio = level / threshold;
    if (ratio <= 0.5) return "bg-red-500";
    if (ratio <= 1) return "bg-yellow-500";
    return "bg-green-500";
  }
  
  const getStockBadge = (level: number, threshold: number) => {
    if (level <= threshold * 0.5) {
      return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" /> Low Stock</Badge>;
    }
    if (level <= threshold) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 gap-1">Reorder Soon</Badge>;
    }
    return <Badge variant="outline" className="bg-green-100 text-green-800">In Stock</Badge>;
  }
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span>{item.stockLevel} units</span>
                        <span>{Math.round((item.stockLevel / item.threshold) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(item.stockLevel / item.threshold) * 100} 
                        className={getStockLevelColor(item.stockLevel, item.threshold)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStockBadge(item.stockLevel, item.threshold)}
                  </TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Update stock</DropdownMenuItem>
                        <DropdownMenuItem>Order more</DropdownMenuItem>
                        <DropdownMenuItem>Edit item</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
