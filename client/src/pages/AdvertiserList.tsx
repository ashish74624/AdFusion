import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { base_url } from "@/utils/baseUrl";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Advertiser {
    id: number;
    name: string;
    campaigns: { id: number }[];
}

export default function AdvertiserList() {
    const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
    const [newAdvertiserName, setNewAdvertiserName] = useState("");

    const navigate = useNavigate();

    const fetchList = async () => {
        const res = await fetch(`${base_url}/advertiser/list`);
        if (res.ok) {
            const data = await res.json();
            setAdvertisers(data.advertisers || []);
        }
    }

    useEffect(() => {

        fetchList();
    }, []);

    const handleCreate = async () => {
        try {
            const res = await fetch(`${base_url}/advertiser/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newAdvertiserName
                })
            })

            if (res.ok) {
                fetchList();
            }
        } catch {
            toast.error("Unable to add advertiser at the moment")
        }
    };

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-2xl font-light mb-6">Advertisers</h3>
                <Modal>
                    <ModalTrigger>
                        <Button>
                            Add New
                        </Button>
                    </ModalTrigger>
                    <ModalBody>
                        <ModalContent className="h-max">
                            <h2 className="text-xl font-semibold mb-4">New Advertiser</h2>
                            <div className="">
                                <label
                                    htmlFor="advertiser-name-input"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    id="advertiser-name-input"
                                    type="text"
                                    value={newAdvertiserName}
                                    onChange={(e) => setNewAdvertiserName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Advertiser Name"
                                />
                            </div>
                        </ModalContent>
                        <ModalFooter className="gap-4">
                            <Button onClick={handleCreate}>
                                Create
                            </Button>
                        </ModalFooter>
                    </ModalBody>
                </Modal>
            </div>

            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead ></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Campaigns</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {advertisers.length > 0 ? (
                            advertisers.map((advertiser) => (
                                <TableRow key={advertiser.id} data-advertiser-id={advertiser.id}
                                    onClick={() => navigate(`/admin/advertiser/view?advertiser_id=${advertiser.id}`)}
                                >
                                    <TableCell>
                                        <input type="checkbox" className="h-4 w-4" />
                                    </TableCell>
                                    <TableCell>
                                        {advertiser.name}
                                    </TableCell>
                                    <TableCell>
                                        {advertiser.campaigns.length}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    This administrator has no advertisers
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

        </>
    );
}
