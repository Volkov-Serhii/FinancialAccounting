import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MyChart = ({ data, labels }) => {
    const chartRef = useRef();

    useEffect(() => {
        // Инициализация гистограммы
        const ctx = chartRef.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Spendings(UAH)',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Цвет столбцов
                    borderColor: 'rgba(75, 192, 192, 1)', // Цвет границ столбцов
                    borderWidth: 1,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        // Очистка ресурсов при размонтировании компонента
        return () => {
            myChart.destroy();
        };
    }, [data, labels]);

    return (
        <div>
            <canvas ref={chartRef} width="400" height="400"></canvas>
        </div>
    );
};

export default MyChart;
