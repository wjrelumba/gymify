import ManageTrainers from "./ManageTrainers";
import ManageClients from "./ManageClients"

interface ManagementObject {
    ManageTrainers: any,
    ManageClients: any,
}

const Management: ManagementObject = {
    ManageTrainers,
    ManageClients,
}

export default Management;