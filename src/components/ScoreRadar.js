import { ResponsiveRadar } from '@nivo/radar'

const ScoreRadar = ({ data }) => (
    <ResponsiveRadar
        data={data}
        keys={[ '학점' ]}
        indexBy="select"
        maxValue={4.5}
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderWidth={0}
        borderColor={{ from: 'color', modifiers: [] }}
        gridLevels={6}
        gridShape="linear"
        gridLabelOffset={16}
        dotSize={12}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [] }}
        dotLabel="value"
        dotLabelYOffset={-10}
        colors={{ scheme: 'nivo' }}
        fillOpacity={1}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[{
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000'
                    }
                }
            ]
        }]}
    />
)

export default ScoreRadar;