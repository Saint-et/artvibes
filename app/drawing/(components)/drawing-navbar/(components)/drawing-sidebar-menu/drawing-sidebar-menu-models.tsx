import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaClone, FaLayerGroup } from "react-icons/fa";





interface DrawingSidebarMenuModelsProps {
    isMenuOpen: number;
  
  }

const DrawingSidebarMenuModels: React.FC<DrawingSidebarMenuModelsProps> = (props) => {

    return (<>
    {props.isMenuOpen === 7 && (
          <Card className="border-none rounded-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-1xl flex justify-between">
              Models :<FaLayerGroup className="text-1xl" />
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4"></CardContent>
          </Card>
        )}
    </>)
}

export default DrawingSidebarMenuModels;