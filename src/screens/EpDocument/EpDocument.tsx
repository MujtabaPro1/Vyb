import React from "react";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { Card, CardContent } from "../../components/ui/card";

export const EpDocument = (): JSX.Element => {
  return (
    <div className="bg-transparent flex flex-row justify-center w-full">
      <Card className="w-[1024px] h-[1024px] relative border-none bg-transparent">
        <CardContent className="p-0 h-full">
          <AspectRatio ratio={1 / 1} className="h-full">
            <div className="relative w-full h-full">
              <img
                className="absolute w-[768px] h-[896px] top-16 left-32"
                alt="Document icon"
                src="/vector.svg"
              />
            </div>
          </AspectRatio>
        </CardContent>
      </Card>
    </div>
  );
};
