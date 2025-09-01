import Skeleton from '@mui/material/Skeleton'

interface SkeletonLoaderTableBodyProps {
  rows?: number;
  columns?: number;
}

export default function SkeletonLoaderTableBody({ rows = 5, columns = 4 }: SkeletonLoaderTableBodyProps) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, i) => (
            <th key={i} style={{ padding: 8 }}>
              <Skeleton sx={{ bgcolor: 'darkgray' }} variant="text" width={80} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex} style={{ padding: 8 }}>
                <Skeleton animation="wave" variant="text" width="100%" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
