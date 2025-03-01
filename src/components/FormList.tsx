import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2, Copy } from "lucide-react";

interface Form {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

interface FormListProps {
  forms: Form[];
}

export function FormList({ forms }: FormListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (forms.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-700 mb-2">You don't have any forms yet</h3>
        <p className="text-gray-500 mb-6">Create your first form to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {forms.map((form) => (
        <Card key={form.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">{form.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Created on {formatDate(form.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm line-clamp-2">{form.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 border-t">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}