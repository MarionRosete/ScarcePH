import { AddShipment } from "@/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ShipmentObj } from "@/features/admin/types/Order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type FormEvent, useEffect, useMemo, useState } from "react";

type ShipmentStatus = "in_transit" | "delivered";

const normalizeStatus = (value?: string): ShipmentStatus => {
  if (value === "delivered") return "delivered";
  return "in_transit";
};

type ShipmentDailogProps = {
  order_id: number;
  shipment?: ShipmentObj;
};

export function ShipmentDailog({ order_id, shipment }: ShipmentDailogProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [tracking, setTracking] = useState("");
  const [courier, setCourier] = useState("");
  const [status, setStatus] = useState<ShipmentStatus>("in_transit");

  const hasExistingShipment = useMemo(
    () => Boolean(shipment?.tracking || shipment?.carrier || shipment?.status),
    [shipment?.tracking, shipment?.carrier, shipment?.status]
  );

  const addShipmentMutation = useMutation({
    mutationFn: AddShipment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-order"] });
      setOpen(false);
    },
  });

  const resetForm = () => {
    setTracking(shipment?.tracking ?? "");
    setCourier(shipment?.carrier ?? "");
    setStatus(normalizeStatus(shipment?.status));
  };

  useEffect(() => {
    if (open) resetForm();
  }, [open, shipment]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!tracking.trim() || !courier.trim()) return;
    addShipmentMutation.mutate({
      order_id,
      carrier: courier.trim(),
      tracking: tracking.trim(),
      status,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="xs" className="mt-2" variant={hasExistingShipment ? "outline" : "default"}>
          {hasExistingShipment ? "Edit shipment" : "Add shipment"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>{hasExistingShipment ? "Edit shipment" : "Add shipment"}</DialogTitle>
          <DialogDescription>
            {hasExistingShipment ? "Update shipment details for this order." : "Fill in shipment details for this order."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label htmlFor="tracking">Tracking</Label>
            <Input
              id="tracking"
              placeholder="e.g. PH123456789"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="courier">Courier</Label>
            <Input
              id="courier"
              placeholder="e.g. LBC"
              value={courier}
              onChange={(e) => setCourier(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label>Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as ShipmentStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in_transit">in transit</SelectItem>
                <SelectItem value="delivered">delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" size="sm" disabled={addShipmentMutation.isPending}>
              {addShipmentMutation.isPending ? "Saving..." : hasExistingShipment ? "Save changes" : "Add shipment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
