export type User ={
    id: number;
    name: string;
    email: string;
    created_at: string;
    geoip: geoIP;
    ip: string;
    classes: string[];
    archived_classes: string[];
}


type geoIP= {
    cityName: string;
    latitude: number;
    timeZone: string;
    longitude: number;
    countryCode: string;
    countryName: string;
    countryCode3: string;
}

export type Class = {
    id: string;
    created_at: string;
    course_code: string;
    units: string;
    title: string;
    description: string;
}

export type Document = {
    id: string;
    created_at: string;
    aws_url: string;
    name: string;
    user_email: string;
    class_id: string;
}

export type Post = {
    id: string;
    created_at: string;
    content: string;
    class_id: string;
    user_email: string;
    thread_id: string;
    deleted: boolean;
}

export type Thread = {
    id: string;
    created_at: string;
    class_id: string;
    name: string;
    content: string;
    user_email: string;
}
