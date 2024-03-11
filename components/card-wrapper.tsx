import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';

type CardWrapperProps = {
    title: string;
    description: string;
    worst: string;
    average: string;
    best: string;
};

export const CardWrapper = ({ title, description, worst, average, best }: CardWrapperProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    Average Case: {average} | Best Case: {best} | Worst Case: {worst}
                </CardDescription>
            </CardHeader>
            <CardContent>{description}</CardContent>
        </Card>
    );
};
