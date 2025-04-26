import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { base_url } from "@/utils/baseUrl";

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
    const [searchParams] = useSearchParams();

    const publisher_id = searchParams.get("publisher_id");

    useEffect(() => {
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

        fetchData();
    }, []);

    return (
        <Section>
            <h3 className="text-2xl font-bold mb-4">{publisher?.name}</h3>

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
                                    />
                                </div>

                                <div>
                                    {/* <label htmlFor="zone-size-select" className="block text-sm font-medium mb-1">
                                        Size
                                    </label>
                                    <select id="zone-size-select" className="w-full border rounded px-3 py-2">
                                        <option disabled>IAB Core Ad Units:</option>
                                        <option value="300x250">300x250 - Medium Rectangle</option>
                                        <option value="180x150">180x150 - Rectangle</option>
                                        <option value="728x90">728x90 - Leaderboard</option>
                                    </select> */}
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="IAB Core Ad Units:" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="300x250">300x250 - Medium Rectangle</SelectItem>
                                            <SelectItem value="180x150">180x150 - Rectangle</SelectItem>
                                            <SelectItem value="728x90">728x90 - Leaderboard</SelectItem>
                                        </SelectContent>
                                    </Select>

                                </div>
                            </div>
                        </ModalContent>
                        <ModalFooter className="gap-4">
                            <Button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
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
                                    <TableCell className="py-2 px-4 border-b">
                                        <input type="checkbox" className="form-checkbox" />
                                    </TableCell>
                                    <TableCell className="py-2 px-4 border-b whitespace-nowrap">{zone.name}</TableCell>
                                    <TableCell className="py-2 px-4 border-b whitespace-nowrap">
                                        {zone.width}x{zone.height}
                                    </TableCell>
                                    <TableCell className="py-2 px-4 border-b whitespace-nowrap">{zone.placements.length}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                    <TableCell colSpan={4} className="text-center py-4 text-gray-500">
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
                >
                    <span className="text-xl">🗑️</span>
                    <span>Delete</span>
                </Button>
            </div>
        </Section>
    );
};

export default PublisherView;
