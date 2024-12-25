import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Report() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 text-4xl font-bold">Report</div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 pr-4">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores,
            doloribus, fugit deleniti natus at modi quaerat repellat ducimus
            laborum beatae sint praesentium iste unde inventore. Beatae aut
            culpa hic quod harum, ex voluptatum! Ipsa, amet dolorem quidem
            doloribus dolores impedit quas fugit adipisci minima architecto
            ipsum eveniet, fugiat explicabo non.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt
            ad maiores voluptatum ipsam quam dolorem nobis, vero magni
            blanditiis, voluptatibus aut labore illum earum. Aliquam distinctio
            exercitationem quis ipsam doloribus? Et amet doloremque, consequatur
            cumque eveniet sint, sequi doloribus quas dolores animi ipsa earum
            ex nihil, architecto porro nisi odio fugiat. Voluptates quia quaerat
            repudiandae mollitia rem distinctio, magni nobis adipisci tenetur!
            Incidunt aspernatur consequuntur dolorem accusantium quos ab sed aut
            delectus ex nihil dolor totam fugiat ut tempore, amet architecto
            veniam necessitatibus eius sapiente similique aperiam saepe!
            Accusantium laborum et earum quod. Provident neque iusto ea quisquam
            illum quae.
          </p>
        </div>
      </ScrollArea>
    </div>
  );
}
