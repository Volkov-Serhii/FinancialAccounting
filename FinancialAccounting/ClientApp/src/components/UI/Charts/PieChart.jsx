import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data, labels }) => {
    const chartRef = useRef();

    useEffect(() => {
        // Инициализация круговой диаграммы
        const ctx = chartRef.current.getContext('2d');
        const myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'green'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'green'],
                    borderWidth: 1,
                }],
            },
        });

        // Очистка ресурсов при размонтировании компонента
        return () => {
            myPieChart.destroy();
        };
    }, [data, labels]);

    return (
        <div>
            <canvas ref={chartRef} width="400" height="400"></canvas>
        </div>
    );
};

export default PieChart;
