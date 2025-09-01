import Skeleton from "@mui/material/Skeleton";

interface SkeletonLoaderCardsBodyProps {
  rows?: number;
  columns?: number;
}

export default function SkeletonLoaderCardsBody({ rows = 1, columns = 1 }: SkeletonLoaderCardsBodyProps) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, i) => (
            <th key={i} style={{ padding: 8 }}>
              <Skeleton variant="rectangular" animation="wave" width={80} height={24} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex} style={{ padding: 8 }}>
                <Skeleton variant="rectangular" animation="wave" width={80} height={24} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
