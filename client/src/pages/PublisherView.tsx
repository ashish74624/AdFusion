import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { base_url } from "@/utils/baseUrl";
import toast from "react-hot-toast";

type Placement = {
    id: number;
    object: string;
};

type Zone = {
    id: number;
    name: string;
    width: number;
    height: number;
    placements: Placement[];
};

type Publisher = {
    id: number;
    name: string;
};

const PublisherView = () => {
    const [publisher, setPublisher] = useState<Publisher | null>(null);
    const [zones, setZones] = useState<Zone[]>([]);
    const [zoneList,setZoneList] = useState<number[]>([]);
    const [searchParams] = useSearchParams();

    const [name,setName] = useState("");

    const publisher_id = searchParams.get("publisher_id");
    const fetchData = async () => {
        try {
            const res = await fetch(`${base_url}/publisher/view?publisher_id=${publisher_id}`);
            const data = await res.json();
            setPublisher(data.publisher);
            setZones(data.zones);
        } catch (error) {
            console.error("Failed to fetch publisher and zones", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [selectedSize, setSelectedSize] = useState<string>("");

    const addNewZone = async () => {
        if (!selectedSize) {
            toast.error("Please select a size before creating the zone.");
            return;
        }
        try {
            const res = await fetch(`${base_url}/zone/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    publisher_id: publisher_id,
                    size: selectedSize,
                    name: name
                })
            });
            if (res.ok) {
                toast.success("Zone added successfully")
                fetchData();
            }
        } catch {
            toast.error("Zone couldn't be added at the moment");
        }
    }


    async function handleDelete() {
        try {
            const res = await fetch(`${base_url}/zone/delete`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    ids:zoneList
                })
            });
            if(res.ok){
                toast.success("Delete Successful");
                fetchData();
            }
        } catch {
            toast.success("Delete failed");
        }
    }

    const navigate = useNavigate();
    
    function toggleZoneSelect(zid: number): void {
        if (zoneList.includes(zid)) {
            setZoneList(zoneList.filter(id => id !== zid));
        } else {
            setZoneList([...zoneList, zid]);
        }
    }

    return (
        <Section>
            <h3 className="text-2xl font-bold mb-4">Publisher name: {publisher?.name}</h3>

            <div className="flex justify-between ">
                <h4 className="text-xl font-semibold mb-2">Zones</h4>
                <Modal>
                    <ModalTrigger>
                        <Button>
                            Add New
                        </Button>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="zone-name-input" className="block text-sm font-medium mb-1">
                                        Name
                                    </label>
                                    <input
                                        id="zone-name-input"
                                        type="text"
                                        placeholder=""
                                        className="w-full border rounded px-3 py-2"
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="zone-size-select" className="block text-sm font-medium mb-1">
                                        Size
                                    </label>
                                    <select
                                        id="zone-size-select"
                                        className="w-full border rounded px-3 py-2 bg-[#0b0a0b]"
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                    >
                                        <option value="">Select Size</option> {/* <- New "select size" prompt */}
                                        <option value="300x250">300x250 - Medium Rectangle</option>
                                        <option value="180x150">180x150 - Rectangle</option>
                                        <option value="728x90">728x90 - Leaderboard</option>
                                    </select>

                                </div>
                            </div>
                        </ModalContent>
                        <ModalFooter className="gap-4">
                            <Button onClick={()=>addNewZone()}>
                                Create
                            </Button>
                        </ModalFooter>
                    </ModalBody>
                </Modal>

            </div>
            <div className="overflow-x-auto mt-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="py-2 px-4 border-b"></TableHead>
                            <TableHead className="py-2 px-4 border-b text-left">Name</TableHead>
                            <TableHead className="py-2 px-4 border-b text-left">Size</TableHead>
                            <TableHead className="py-2 px-4 border-b text-left">Campaigns</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {zones.length > 0 ? (
                            zones.map((zone) => (
                                <TableRow key={zone.id} data-zone-id={zone.id}>
                                    <TableCell className="border-b">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            checked={zoneList.includes(zone.id)}
                                            onChange={() => toggleZoneSelect(zone.id)}
                                        />
                                    </TableCell>
                                    <TableCell className=" border-b whitespace-nowrap hover:text-blue-500 cursor-pointer" onClick={() => navigate(`/admin/publisher/zone/view?zone_id=${zone.id}`)}>{zone.name}</TableCell>
                                    <TableCell className="border-b whitespace-nowrap">
                                        {zone.width}x{zone.height}
                                    </TableCell>
                                    <TableCell className="border-b whitespace-nowrap">{zone.placements.length}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4">
                                    This publisher has no zones
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-6">
                <Button
                    id="zone-delete-button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={zoneList.length===0}
                >
                    Delete
                </Button>
            </div>
        </Section>
    );
};

export default PublisherView;
